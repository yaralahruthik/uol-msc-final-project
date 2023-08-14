// server.js

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './service/todo.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const todo_proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let todos = [
  { id: 1, task: 'Buy groceries' },
  { id: 2, task: 'Complete the report for work' },
  { id: 3, task: 'Water the plants' },
  { id: 4, task: "Attend the doctor's appointment" },
  { id: 5, task: 'Clean the living room' },
  { id: 6, task: 'Submit the tax return form' },
  { id: 7, task: 'Pick up kids from school' },
  { id: 8, task: 'Renew gym membership' },
  { id: 9, task: 'Update the resume' },
  { id: 10, task: 'Bake a cake for the birthday party' },
  { id: 11, task: 'Call the bank for account details' },
  { id: 12, task: 'Repair the kitchen sink' },
  { id: 13, task: 'Buy a new pair of shoes' },
  { id: 14, task: 'Mail the gift package to Aunt Jane' },
  { id: 15, task: 'Recharge mobile phone' },
  { id: 16, task: 'Book flight tickets for the vacation' },
  { id: 17, task: "Read the book 'The Great Gatsby'" },
  { id: 18, task: 'Visit Grandma this weekend' },
  { id: 19, task: 'Mow the lawn' },
  { id: 20, task: 'Paint the bedroom wall' },
  { id: 21, task: 'Register for the online course' },
  { id: 22, task: 'Order pizza for dinner' },
  { id: 23, task: 'Attend the parent-teacher meeting' },
  { id: 24, task: 'Cancel the magazine subscription' },
  { id: 25, task: 'Do a 30-minute workout' },
  { id: 26, task: 'Schedule a car maintenance appointment' },
  { id: 27, task: 'Plan the weekend getaway' },
  { id: 28, task: 'Wash the car' },
  { id: 29, task: 'Refill the prescription medications' },
  { id: 30, task: 'Write the monthly budget' },
  { id: 31, task: 'Visit the dentist for a check-up' },
  { id: 32, task: 'Donate old clothes to charity' },
  { id: 33, task: 'Backup computer files' },
  { id: 34, task: 'Make a playlist for the gym' },
  { id: 35, task: 'Take the dog for vaccination' },
  { id: 36, task: 'Buy a new laptop charger' },
  { id: 37, task: 'Write a letter to a friend' },
  { id: 38, task: 'Clean the refrigerator' },
  { id: 39, task: 'Visit the local museum' },
  { id: 40, task: 'Get a haircut' },
  { id: 41, task: 'Research new recipes for dinner' },
  { id: 42, task: 'Check oil level in the car' },
  { id: 43, task: 'Buy tickets for the theater show' },
  { id: 44, task: 'Review insurance policy' },
  { id: 45, task: 'Set up the new router' },
  { id: 46, task: 'Plant new flowers in the garden' },
  { id: 47, task: 'Organize the bookshelf' },
  { id: 48, task: 'Buy a new winter coat' },
  { id: 49, task: 'Attend the yoga class' },
  { id: 50, task: 'Update the family photo album' },
  { id: 51, task: 'Watch the new movie in the cinema' },
  { id: 52, task: 'Renew the library membership' },
  { id: 53, task: 'Study for the upcoming exam' },
  { id: 54, task: 'Clean the garage' },
  { id: 55, task: 'Return borrowed items to friends' },
  { id: 56, task: 'Prepare for the Monday presentation' },
  { id: 57, task: 'Do the laundry' },
  { id: 58, task: 'Send thank-you notes' },
  { id: 59, task: 'Attend the community meeting' },
  { id: 60, task: 'Buy a birthday gift for Mom' },
  { id: 61, task: 'Cook dinner for the family' },
  { id: 62, task: 'Reorganize the closet' },
  { id: 63, task: 'Fix the leak in the bathroom' },
  { id: 64, task: "Check kids' homework" },
  { id: 65, task: 'Attend the pottery class' },
  { id: 66, task: 'Write a journal entry' },
  { id: 67, task: 'Buy pet food' },
  { id: 68, task: 'Change light bulbs in the living room' },
  { id: 69, task: 'Update the contact list' },
  { id: 70, task: 'Buy new bed sheets' },
  { id: 71, task: 'Set up the new TV' },
  { id: 72, task: "Review the kids' school schedule" },
  { id: 73, task: 'Book a table for the anniversary dinner' },
  { id: 74, task: 'Vacuum the house' },
  { id: 75, task: 'Transfer photos from the phone to the computer' },
  { id: 76, task: 'Buy new garden tools' },
  { id: 77, task: 'Pay the electricity bill' },
  { id: 78, task: 'Print the family vacation photos' },
  { id: 79, task: 'Repair the bicycle tire' },
  { id: 80, task: 'Call the plumber for kitchen sink' },
  { id: 81, task: 'Attend the book club meeting' },
  { id: 82, task: 'Replant the houseplants' },
  { id: 83, task: 'Shop for the weekend barbecue' },
  { id: 84, task: 'Learn a new song on the guitar' },
  { id: 85, task: 'Buy a new printer cartridge' },
  { id: 86, task: 'Visit the new cafe in town' },
  { id: 87, task: 'Get a massage' },
  { id: 88, task: 'Order new glasses' },
  { id: 89, task: 'Update the antivirus software' },
  { id: 90, task: 'Clean the fish tank' },
  { id: 91, task: 'Replace the old doormat' },
  { id: 92, task: "Attend the kids' sports day" },
  { id: 93, task: 'Buy new kitchen utensils' },
  { id: 94, task: 'Organize the tools in the shed' },
  { id: 95, task: 'Plan the holiday season gifts' },
  { id: 96, task: 'Send an RSVP for the wedding invitation' },
  { id: 97, task: 'Visit the farmers market' },
  { id: 98, task: 'Order the new book release online' },
  { id: 99, task: 'Change the car wiper blades' },
  { id: 100, task: 'Do a home safety check' },
];
let id = 101;

server.addService(todo_proto.TodoService.service, {
  ListTodos: (_, callback) => {
    const newTodos = todos.slice(-100);
    callback(null, { todos: newTodos });
  },
  GetTodo: (call, callback) => {
    let todo = todos.find((t) => t.id === call.request.id);
    if (todo) {
      callback(null, todo);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not Found',
      });
    }
  },
  AddTodo: (call, callback) => {
    let todo = {
      id,
      task: call.request.task,
    };
    todos.push(todo);
    id++;
    callback(null, todo);
  },
});

server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://localhost:50051');
server.start();
