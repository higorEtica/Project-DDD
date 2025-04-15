
import SendEmailWhenProductIsCreatedHandler from "../product/event/handler/send-emial-when-produc-is-created.handler";
import ProductCreatedEvent from "../product/event/product-create.event";
import EventDispatcher from "./event-dispacher";


describe("Domain events tests", () => {
    it("should create an event dispatcher", () => {
        // configurar o event dispatcher
        const eventDispatcher = new EventDispatcher();
        // criar o event handler
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // criando o expect 
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        // configurar o event dispatcher
        const eventDispatcher = new EventDispatcher();
        // criar o event handler
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // criando o expect 
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);

       eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

       // criando o expect 
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(0);

    });

    it("should unregister all event handlers", () => {
        // configurar o event dispatcher
        const eventDispatcher = new EventDispatcher();
        // criar o event handler
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        // criando o expect 
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);

       eventDispatcher.unregisterAll();

       // criando o expect 
       expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler,"handler");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10
        });
        //Quando o notify for executado o sendEmailWhenProductIsCreatedHandler deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });
});