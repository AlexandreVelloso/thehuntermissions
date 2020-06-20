interface SendResetEmailService {

    sendEmailTo(userEmail: string): Promise<void>;

}

export default SendResetEmailService;