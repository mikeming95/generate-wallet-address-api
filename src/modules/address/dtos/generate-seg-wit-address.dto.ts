import { IsString, MinLength, IsArray, ArrayMinSize } from 'class-validator';

export class GenerateSegWitAddressDto {
    /**
     * @param   {string[]} seed
     * @param   {string}   path
     */
    @IsArray({message:"seed must be string[] type"})
    @ArrayMinSize(1,{message:"seed missing"})
    readonly seed?: string[];
    
    @IsString({message:"path must be string type"})
    @MinLength(1,{message:"path missing"})
    readonly path?: string;
  }