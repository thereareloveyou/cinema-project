import { IsInt, IsDefined, IsString, IsOptional, IsNumber } from "class-validator";


export class CreateMovie {

    @IsDefined()
    @IsString()
    poster!: string;

    @IsDefined()
    @IsString()
    bigPoster!: string;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    @IsInt()
    year!: number;

    @IsDefined()
    @IsInt()
    duration!: number;

    @IsDefined()
    @IsString()
    country!: string;

    @IsDefined()
    @IsString()
    slug!: string;

    @IsDefined()
    @IsString()
    description!: string;


    @IsDefined()
    @IsString()
    videoUrl!: string;

    @IsOptional()
    genres?: string[];

    @IsOptional()
    actors?: string[];
}
