import hashTracking from '../../src/plugins/hashTracking';

describe('hashTracking', () => {
  let Simpla,
      hashObserver,
      stateStub = sinon.stub().returns({ config: { hashTracking: true } }),
      observer = {
        unobserve: sinon.stub()
      };

  beforeEach(() => {
    Simpla = {
      observeState: sinon.stub().returns(observer),
      editable: sinon.stub(),
      getState: stateStub
    };

    sinon.stub(window, 'addEventListener', (ev, callback) => {
      hashObserver = callback;
    });

    sinon.stub(window, 'removeEventListener', () => {
      hashObserver = undefined;
    });
  });

  afterEach(() => {
    window.location.hash = '';
    window.addEventListener.restore();
    window.removeEventListener.restore();

    Simpla.observeState.reset();
    Simpla.editable.reset();
    Simpla.getState = stateStub;
    stateStub.reset();
  });

  it('should observe editable and change hash accordingly', () => {
    let property,
        callback;

    hashTracking(Simpla);
    [ property, callback ] = Simpla.observeState.withArgs('editable').lastCall.args;

    callback(true);
    expect(window.location.hash).to.equal('#edit');

    callback(false);
    expect(window.location.hash).to.not.equal('#edit');
  });

  it('should not run if hashTracking is false', () => {
    let property,
        callback;

    Simpla.getState = sinon.stub().returns({ config: { hashTracking: false } });
    hashTracking(Simpla);
    [ property, callback ] = Simpla.observeState.lastCall.args;

    expect(property).to.equal('config.hashTracking');

    callback(true);
    expect(Simpla.observeState.lastCall.args[0]).to.equal('editable');
    expect(hashObserver).to.be.defined;

    callback(false);
    expect(observer.unobserve.called).to.be.true;
    expect(hashObserver).to.be.undefined;
  });

  it('should listen for changes on the window and update Simpla accordingly', () => {
    let editableWindow = {
          location: { hash: '#edit' }
        },
        notEditableWindow = {
          location: { hash: '' }
        };

    hashTracking(Simpla);

    // Check it listens
    expect(window.addEventListener.calledWith('hashchange')).to.be.true;

    // Should initialize things
    expect(Simpla.editable.lastCall.args[0]).to.be.false;

    hashObserver({ target: editableWindow });
    expect(Simpla.editable.lastCall.args[0]).to.be.true;

    hashObserver({ target: notEditableWindow });
    expect(Simpla.editable.lastCall.args[0]).to.be.false;
  });
});
