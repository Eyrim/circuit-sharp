class ComponentIDUndefinedException extends Error {
    constructor(message) {
        super(message);
        this.name = "ComponentIDUndefinedException";
    }
}