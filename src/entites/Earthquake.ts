export default class Earthquake {
    public id!: string;
    public mag!: string;
    public place!: string;
    public title!: string;
    public time!: string;
    public longitude!: string;
    public latitude!: string;
    public elevation: string;

    constructor(earthquake: Record<string, string>) {
        this.id = earthquake['id'];
        this.mag = earthquake['mag'];
        this.place = earthquake['place'];
        this.title = earthquake['title'];
        this.time = earthquake['title'];
        this.longitude = earthquake['longitude'];
        this.latitude = earthquake['latitude'];
        this.elevation = earthquake['elevation'];
    }

    toDB(): any {
        const earthquakeToInsert = Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .reduce((newObj: Record<string, any>, [key]): Record<string, string> => {
                newObj[key] = this[key];
                return newObj;
            }, {});
        return earthquakeToInsert;
    }


    public static fromHttpRes(properties: any, geometry: any, id: string): Earthquake {
        const data = {
            id,
            mag: properties.mag.toString(),
            place: properties.place,
            time: properties.time,
            title: properties.title,
            longitude: geometry.coordinates[0].toString(),
            latitude: geometry.coordinates[1].toString(),
        };
        return new Earthquake(data);
    }
}
