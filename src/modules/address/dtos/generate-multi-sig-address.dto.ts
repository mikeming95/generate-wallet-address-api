import { IsNumber, ArrayMinSize, Min } from 'class-validator';

export class GenerateMultiSigAddressDto {
    /**
     * @param   {string[]} keys
     * @param   {number}   m
     * @param   {number}   n
     */
    @IsNumber({},{message:"m must be number type"})
    @Min(1,{message:"m must be greater than 0"})
    readonly m?: number;
    
    @IsNumber({},{message:"n must be number type"})
    @Min(1,{message:"n must be greater than 0"})
    readonly n?: number;

    @ArrayMinSize(1,{message:"The length of keys must be greater than 1"})
    readonly addresses?: string[];
  }