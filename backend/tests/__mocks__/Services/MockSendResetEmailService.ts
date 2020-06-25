import SendResetEmailService from "../../../api/Services/SendResetEmailService";

class MockSendResetEmailService implements SendResetEmailService {

    sendEmailTo(userEmail: string): any { }

}

export default MockSendResetEmailService;