import hashTracking from '../../src/plugins/hashTracking';

describe('hashTracking', () => {
  let Simpla,
      hashObserver;

  beforeEach(() => {
    Simpla = {
      observe: sinon.stub(),
      startEditing: sinon.stub(),
      stopEditing: sinon.stub()
    };

    sinon.stub(window, 'addEventListener', (ev, callback) => {
      hashObserver = callback;
    });
  });

  afterEach(() => {
    window.location.hash = '';
    window.addEventListener.restore();
  });

  it('should observe editing and change hash accordingly', () => {
    let property,
        callback;

    hashTracking(Simpla);
    [ property, callback ] = Simpla.observe.lastCall.args;

    expect(property).to.equal('editing');

    callback(true);
    expect(window.location.hash).to.equal('#edit');

    callback(false);
    expect(window.location.hash).to.equal('');
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
    expect(Simpla.stopEditing.callCount).to.equal(1);

    hashObserver({ target: editingWindow });
    expect(Simpla.startEditing.callCount).to.equal(1);

    hashObserver({ target: notEditingWindow });
    expect(Simpla.stopEditing.callCount).to.equal(2);
  });
});
