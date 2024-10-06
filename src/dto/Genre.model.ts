import { IsInt, IsDefined, IsString, IsOptional } from "class-validator";
import { CreateMovie } from "./CreateMovie.dto";

export class Genre {

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    slug!: string;

    @IsDefined()
    @IsString()
    description!: string;

    @IsDefined()
    @IsString()
    icon!: string;

    // @IsOptional()
    // movieId?: string

}
