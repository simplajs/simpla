import hashTracking from '../../src/plugins/hashTracking';

describe('hashTracking', () => {
  let Simpla,
      hashObserver,
      stateStub = sinon.stub().returns({ options: { _useHashTracking: true } }),
      unobserve = sinon.stub();

  beforeEach(() => {
    Simpla = {
      observeState: sinon.stub().returns(unobserve),
      toggleEditing: sinon.stub(),
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
    Simpla.toggleEditing.reset();
    Simpla.getState = stateStub;
    stateStub.reset();
  });

  it('should observe editing and change hash accordingly', () => {
    let property,
        callback;

    hashTracking(Simpla);
    [ property, callback ] = Simpla.observeState.withArgs('editing').lastCall.args;

    callback(true);
    expect(window.location.hash).to.equal('#edit');

    callback(false);
    expect(window.location.hash).to.not.equal('#edit');
  });

  it('should not run if _useHashTracking is false', () => {
    let property,
        callback;

    Simpla.getState = sinon.stub().returns({ options: { _useHashTracking: false } });
    hashTracking(Simpla);
    [ property, callback ] = Simpla.observeState.lastCall.args;

    expect(property).to.equal('options._useHashTracking');

    callback(true);
    expect(Simpla.observeState.lastCall.args[0]).to.equal('editing');
    expect(hashObserver).to.be.defined;

    callback(false);
    expect(unobserve.called).to.be.true;
    expect(hashObserver).to.be.undefined;
  });

  it('should listen for changes on the window and update Simpla accordingly', () => {
    let editingWindow = {
          location: { hash: '#edit' }
        },
        notEditingWindow = {
          location: { hash: '' }
        };

    hashTracking(Simpla);

    // Check it listens
    expect(window.addEventListener.calledWith('hashchange')).to.be.true;

    // Should initialize things
    expect(Simpla.toggleEditing.lastCall.args[0]).to.be.false;

    hashObserver({ target: editingWindow });
    expect(Simpla.toggleEditing.lastCall.args[0]).to.be.true;

    hashObserver({ target: notEditingWindow });
    expect(Simpla.toggleEditing.lastCall.args[0]).to.be.false;
  });
});
