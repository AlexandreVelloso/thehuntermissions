interface ForgorPasswordService {

    sendEmail(userEmail: string): Promise<void>;

}

export default ForgorPasswordService;