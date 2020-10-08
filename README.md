# NestJS-Custom-Business-Events

This is a Nest JS module I have used to one of my project. The purpose of this module is to send request to a microservice which use as a rule engine to execute business rules.
Once the rules executed on the microservice, this module will listen for the result and do the actions according to the result from the rule engine.

## Usage

You can use this module in the other modules of your Nest JS project. For example, let's say you have a controller called `InvoiceController`. Let's assume in this controller
you have a method call `addInvoice()`
```typescript
@Controller('invoice')
export class InvoiceController {
  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private eventService: EventService // eventService from this reposotory
  ) {}
  
  @Post()
  async addInvoice(@Body() body: InvoiceDto) {
    // validations , calculations like stuff
    const customer = await this.customerService.customerModel.findById(order.customer_id);

    //emmiting the event just before add the invoice to the database
    this.eventService.emit(
      EventTypes.ON_INVOICE_ADD,
      {
        event_name: EventTypes.ON_INVOICE_ADD,
        fact: {
          customer_email: customer.email,
          invoice_value: body.amount,
          isPaid: body.isPaid,
        },
      },
      async () => {
        // add invoice to the database
        await this.invoiceService.invoiceModel.createOne(body as any);
      }
    );

    return { message: 'Processing' };
  }
}
```

There are set of events that can happen in the application. Those event types are defined inside this repo. One of the event is ON_INVOICE_ADD. this is just a type. The client,
or the developer who use this module, needs to find the appropirate event for his/her method and use it.

The method `emit()` has three(03) arguments. First one is the type of the event from the `EventTypes` enum. the second argument has the fact that is going to check against the rules in the database used in rule engine microservice.

The 3rd argument is the callback function which is going to execute after the result came in from the microservice. You have to add the logic of the addInvoice() method in to callback function. But you don't need to add everything in to here, for example, validating, doing calucation like stuff, you can do them before emit the event. What you need to do in the callback is, actuall purpose / logic of the addInvoice method. In this case, it is adding an invoice to the database.

**IMPORTANT!! - The callback is not going to call always. For example, if the Action, UNDO_ACTIVITY triggered, then the callback will be ignored and instead UNDO_ACTIVITY will emit a notification to the front end that saying "The process is block by 'rule_name'"**
