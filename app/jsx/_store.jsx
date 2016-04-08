var JobStore = function () {

    this.entries = [];
    this.restUrl = endpoint['localhost'];

    dispatcher.register(function (payload) {
        console.info('on event: ', payload.type);

        switch (payload.type) {
            case 'all' :
                this.request();
                break;
            case 'add' :
                emitter.emit(payload.type);
                break;
            case 'edit' :
                emitter.emit(payload.type, payload.data);
                break;
            case 'save-update' :
                this.saveOrUpdate(payload);
                break;
            case 'delete' :
                this.deleteEntry(payload.data);
                break;
        }
    }.bind(this));

    this._notify = function () {
        console.info('notify: ', this.entries);

        emitter.emit('changed', this.entries);
    };

    this.saveOrUpdate = function (payload) {
        
        if(payload.data.createdDate){
           // payload.createdDate = DATE.valueOf(payload.createdDate);
            payload.data.createdDate = moment(payload.data.createdDate, "MM/DD/YYYY hh:mm a").toDate();
        }
        
        if (payload.data.id) {
            this.update.apply(this, arguments);
        } else {
            this.save.apply(this, arguments);
        }
    };

    this.save = function (payload) {

        console.info('save: ', payload.data);

        $.ajax({
            url: this.restUrl['/rest/job'](),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload.data),
            success: this.request.bind(this)
        });
    };

    this.update = function (payload) {
        console.info('update: ', payload.data);

        $.ajax({
            url: this.restUrl['/rest/job'](),
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(payload.data),
            success: this.request.bind(this)
        });
    };

    this.deleteEntry = function (data) {
        console.info('deleteEntry: ', data);

        $.ajax({
            url: this.restUrl['/rest/job'](data.id),
            type: 'DELETE',
            success: this.request.bind(this)
        });
    };

    this.request = function () {
        $.get(this.restUrl['/rest/job'](), function (entries) {
            this.entries = entries;
            this._notify();
        }.bind(this));
    };
};