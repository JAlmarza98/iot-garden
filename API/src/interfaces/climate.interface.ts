export interface IClimate {
    temperature:    number;
    humidity:       number;
    pollution:      number;
    time_date:      number;
}

export interface IClimateFilter {
    time_start:     number;
    time_end:       number | null;
    time_lapse:     "day" | "week" | "mounth";
}