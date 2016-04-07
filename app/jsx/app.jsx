'use strict';
var emitter = new EventEmitter();
var dispatcher = new Flux.Dispatcher();
var jobStore = new JobStore();

ReactDOM.render(
    <JobPortal />
    , document.getElementById('container'));

