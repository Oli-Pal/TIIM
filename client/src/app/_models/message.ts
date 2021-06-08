export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    senderPhotoUrl: string;
    senderFirstName: string; 
    senderLastName: string;
    receiverId: number;
    receiverUsername: string;
    receiverPhotoUrl: string;
    receiverFirstName: string;
    receiverLastName: string;
    content: string;
    dateRead?: Date;
    dateSent: Date;

  }