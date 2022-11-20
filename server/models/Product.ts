import { Comment } from './Comment';
import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { Order } from './Order';
import { Rating } from './Rating';
import { Brand } from './Brand';
import { Type } from './Type';
import { DeliveryLocation } from './DeliveryLocation';
import { ProductDeliveryLocation } from './ProductDeliveryLocation';

@Table
export class Product extends Model {
	@Column({ type: DataType.STRING(9), allowNull: false, unique: 'code' })
	code!: string;

	@Column({ type: DataType.STRING(200), allowNull: false })
	title!: string;

	@Column({ allowNull: false })
	price!: number;

	@Column({
		type: DataType.STRING(1000),
		allowNull: false,
		set(value: string[]) {
			this.setDataValue('images', value.join(';'));
		},
		get() {
			return this.getDataValue('images').split(';');
		},
	})
	images!: string;

	@Column({ type: DataType.STRING(2000), allowNull: false })
	description!: string;

	@HasMany(() => Comment)
	comments?: Comment | Comment[];

	@HasMany(() => Order)
	orders?: Order | Order[];

	@HasMany(() => Rating)
	rating?: Rating | Rating[];

	@ForeignKey(() => Brand)
	@Column
	brandId!: number;

	@BelongsTo(() => Brand)
	brand!: Brand;

	@ForeignKey(() => Type)
	@Column
	typeId!: number;

	@BelongsTo(() => Type)
	type!: Type;

	@BelongsToMany(() => DeliveryLocation, () => ProductDeliveryLocation)
	deliveryLocations?: DeliveryLocation | DeliveryLocation[];
}
