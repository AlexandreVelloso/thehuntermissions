abstract class BaseDto {
    static modelToDto(_model: any): any {
        throw new Error("Method not implemented.");
    }

    static toDto(t: any): any;
    static toDto(t: any[]): any[];

    static toDto(t: any): any {
        if (Array.isArray(t)) {
            return t.map(model => this.modelToDto(model));
        }

        return this.modelToDto(t);
    }
}

export default BaseDto;