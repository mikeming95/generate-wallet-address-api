import { IsString } from "class-validator";

export class RsaDataDto {
    /**
     * @param {string} - encrypt data
     */
    @IsString({message:"Missing data"})
    readonly data: string;

}