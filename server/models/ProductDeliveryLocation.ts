import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DeliveryLocation } from './DeliveryLocation';
import { Product } from './Product';

@Table
export class ProductDeliveryLocation extends Model {
	@ForeignKey(() => Product)
	@Column
	productId!: number;

	@ForeignKey(() => DeliveryLocation)
	@Column
	deliveryLocationId!: number;
}
