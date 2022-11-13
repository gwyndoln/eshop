import { User } from './User';
import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Product } from './Product';

@Table
export class Order extends Model {
	@Column({ type: DataType.DATEONLY, allowNull: false })
	deliveryDate!: string;

	@Column({ type: DataType.STRING(200), allowNull: false })
	deliveryAddress!: string;

	@ForeignKey(() => Product)
	@Column
	productId!: number;

	@ForeignKey(() => User)
	@Column
	userId!: number;
}
