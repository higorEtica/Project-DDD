
import EventHandlerInterface from "../../../@shared/event-handler.interface";
import ProductCreateEvent from "../product-create.event";

export default class SendEmailWhenProductIsCreatedHandler  implements EventHandlerInterface<ProductCreateEvent>{
    handler(event: ProductCreateEvent): void {
        console.log("Send email to user");
        console.log(`Product created: ${event.eventData.name}`);
        console.log(`Date: ${event.dataTimeOccurred}`);
        console.log("Email sent");
        console.log("====================================");
    }
}