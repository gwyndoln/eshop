import {
	Column,
	DataType,
	Model,
	Table,
	BelongsToMany,
} from 'sequelize-typescript';
import { Product } from './Product';
import { ProductDeliveryLocation } from './ProductDeliveryLocation';

@Table
export class DeliveryLocation extends Model {
	@Column({ type: DataType.STRING(200), allowNull: false })
	address!: string;

	@BelongsToMany(() => Product, () => ProductDeliveryLocation)
	products?: Product | Product[];
}
