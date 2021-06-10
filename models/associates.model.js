const sql = require('./db.js');
const Options = require('../options/associates.options.js');

//constructor
const Associates = (associate) => {};

/** getting all riders */
Associates.getAll = result => {
    sql.query(Options.optionsAll, (errors, results) => {
        if (errors) {
            console.log("error: ", errors);
            result(null, errors);
            return;
        } else {
            result(null, results)
        }
    })
};

/** getting all online riders */
Associates.getOnline = result => {
    sql.query(Options.optionsOnline, [1], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors);
            result(null, errors);
            return;
        } else {
            result(null, results)
        }
    })
}

/** getting all offline riders */
Associates.getOffline = result => {
    sql.query(Options.optionsOffline, [0], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors);
            result(null, errors);
            return;
        } else {
            result(null, results);
        }
    })
}

/** getting all inactive riders */
Associates.getInactive = result => {
    sql.query(Options.optionsInacitve, [0], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors);
            results(null, errors);
            return;
        } else {
            result(null, results);
        }
    })
}

/** get a rider/associate data */
Associates.getAssociate = (associateId, result) => {
    sql.query(Options.optionsAssociate, [associateId], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors);
            results(null, errors);
            return;
        } else {
            result(null, results);
        }
    })
}

/** get rider account */
Associates.getAssociateAccount = (associateType, result) => {
    sql.query(Options.optionsAssociateType, [associateType], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors);
            results(null, errors);
            return;
        } else {
            result(null, results);
        }
    })
}

/** fetch specific online riders */
Associates.fetchRider = (associateId, result) => {
    sql.query(Options.optionsFetchRider, [associateId], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors);
            result(null, errors);
            return;
        } else {
            result(null, results);
        }
    })
}

Associates.getTasks = (driverNo, result) => {
    sql.query(Options.optionsTasksOptions, [driverNo], (errors, results) => {
        if (errors) {
            console.log("errors: ", errors)
            result(null, errors)
            return
        } else {
            result(null, results)
        }
    })
}

module.exports = Associates;
