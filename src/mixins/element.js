/* global Simpla */
function changed(from, prop, value) {
  from.dispatchEvent(new CustomEvent(`${prop}-changed`, { detail: { value } }));
}

const ERRORS = {
  NO_SIMPLA: 'Cannot find Simpla, ensure it is included before this component'
};

export default function SimplaElement(Base) {
  return class extends Base {
    constructor() {
      super();

      if (!window.Simpla) {
        throw new Error(ERRORS.NO_SIMPLA);
      }

      this._loaded = false;
      this.__simplaObservers = {};
      this.__triggerBufferSync = () => {
        if (this.loaded) {
          this._protectedSetCallback();
        }
      };
    }
    
    get path() {
      return this.__path;
    }

    set path(value) {
      let previous = this.__path;
      this.__path = value;

      if (value !== previous) {
        this._initPathIfReady(value);    
      }
    }

    get editable() {
      return this.__editable;
    }

    set editable(value) {
      let previous = this.__editable;
      
      if (!this.readonly) {
        this.__editable = value;

        if (value !== previous) {
          changed(this, 'editable', value);
        }
      }
    }

    get readonly() {
      return this.__readonly;
    }

    set readonly(value) {
      let previous = this.__readonly;
      
      // Disable to allow editable to be set however we like
      this.__readonly = false;

      if (!value && previous === true) {
        this.editable = Simpla.getState('editable');
      } else if (value) {
        this.editable = false;
      }

      this.__readonly = value;      
    }

    get loaded() {
      return this.__loaded;
    }

    set _loaded(value) {
      let previous = this.__loaded;
      this.__loaded = value;

      if (value !== previous) {
        changed(this, 'loaded', value);
      }
    }

    static get observedAttributes() {
      return [ 'path', 'editable', 'readonly', 'loaded' ];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      if (attr === 'path') {
        this.path = newValue;
      } else {
        // Cast as Boolean. 
        this[attr] = newValue !== null;
      }
    }

    /**
     * Setup editable state observer on attach
     * @return {undefined}
     */
    connectedCallback() {
      let { events } = this.constructor.simplaConfig;

      super.connectedCallback && super.connectedCallback();    
      
      events.forEach(event => this.addEventListener(event, this.__triggerBufferSync)); 

      this.editable = this.readonly ? false : this.editable || Simpla.getState('editable');

      this._observeSimplaEditable();
      this._initPathIfReady(this.path);    
    }

    /**
     * Clean up Simpla observers on detach
     * @return {undefined}
     */
    disconnectedCallback() {
      let { events } = this.constructor.simplaConfig;

      super.disconnectedCallback && super.disconnectedCallback();
      
      events.forEach(event => this.removeEventListener(event, this.__triggerBufferSync));

      Object.keys(this.__simplaObservers)
        .forEach(observer => {
          this.__simplaObservers[observer].unobserve();
        });

      this.__simplaObservers = {};
    }

    /**
     * Checks if connected and has a valid path. If so, calls _initSimplaPath
     * @param  {String} path Current value of path prop
     * @return {undefined}
     */
    _initPathIfReady(path) {
      if (this.isConnected && typeof path !== 'undefined') {
        this._initSimplaPath(path);
      }
    }

    /**
     * Init the path observer
     * @param  {String} path Current value of path prop
     * @return {undefined}
     */
    _initSimplaPath(path) {
      this._loaded = false;

      Simpla.get(path)
        .then(item => {
          let isEmpty = !(item && item.data),
            pathChanged = this.path !== path,
            buffer = Simpla.getState('buffer'),
            bufferIsClean = buffer && buffer[path] && !buffer[path].modified;
            
          if (pathChanged) {
            return;
          }

          if (isEmpty && bufferIsClean) {
            // Load static content
            this._protectedSetCallback();
          } else {
            this._protectedGetCallback(item);
          }

          this._loaded = true;

        });

      this._observeSimplaBuffer(path);
    }

    /**
     * Observe buffer for changes to update element
     * @param  {String} path Path to observe in buffer
     * @return {undefined}
     */
    _observeSimplaBuffer(path) {
      let observers = this.__simplaObservers;

      if (!path) {
        return;
      }

      if (observers.buffer) {
        observers.buffer.unobserve();
      }

      observers.buffer = Simpla.observe(path, item => {
        if (item && item.data) {
          this._protectedGetCallback(item);
        }
      });
    }

    /**
     * Sets up the data property to send to Simpla based on given dataProperties
     * @return {Object}  Data to set to Simpla
     */
    updateSimplaBuffer() {
      let { dataProperties } = this.constructor.simplaConfig;

      return dataProperties.reduce((data, prop) => {
        return Object.assign(data, { [ prop ]: this[prop] });
      }, {});
    }

    /**
     * Update element from Simpla data
     * @param  {Object} item The data from Simpla to update with
     * @return {undefined}
     */
    updateFromSimpla(item) {
      Object.assign(this, item.data);
    }

    /**
     * Calls the getCallback but protects against triggering an infinite loop
     * @param  {Object} item Item to give to getCallback
     * @return {undefined}
     */
    _protectedGetCallback(item) {
      this.__loadingFromSimpla = true;
      this.updateFromSimpla(item);
      this.__loadingFromSimpla = false;
    }

    /**
     * Calls the setCallback but protects against triggering an infinite loop
     * @return {undefined}
     */
    _protectedSetCallback() {
      if (!this.__loadingFromSimpla && this.isConnected && this.path) {
        let data = this.updateSimplaBuffer(),
          { type } = this.constructor.simplaConfig;

        if (typeof data !== 'undefined' || data === null) {
          Simpla.set(this.path, { type, data });
        }
      }
    }

    /**
     * Editable state observer
     * @return {undefined}
     */
    _observeSimplaEditable() {
      let { __simplaObservers: observers } = this;

      if (observers.editable) {
        observers.editable.unobserve();
      }

      observers.editable = Simpla.observeState('editable', editable => {
        this.editable = editable;
      });
    }
  };
}