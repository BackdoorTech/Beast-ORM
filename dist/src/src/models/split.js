export const split = (name, model) => {
    model['prototype']['getModelName'] = function () {
        return name;
    };
    model['getModelName'] = function () {
        return name;
    };
    return model;
};
