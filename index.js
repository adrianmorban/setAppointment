import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ 
    region: "us-east-1",
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const setAppointment = async (event) => {

    const { day, hour, fullName, dni } = event;

    return `The appointment was set for ${day} at ${hour} with ${fullName} and the dni is ${dni}`;

    const command = new PutCommand({
        TableName: "sallyAppointments",
        Item: {
            appointmentID: Date.now().toString(),
            day: day,
            hour: hour,
            fullName: fullName,
            dni: dni,
        },
        removeUndefinedValues: true,
        removeNullValues: true,
    });
    const response = await ddbDocClient.send(command);
    return response;
}

export { setAppointment }