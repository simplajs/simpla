import unfetch from 'unfetch';

// Doing this means that we're preferencing calling window.fetch always - which
//  means if window.fetch is altered in future, this will use it. This helps for
//  things like fetch-mock for mocking in tests
export default (...args) => window.fetch ? window.fetch(...args) : unfetch(...args);
