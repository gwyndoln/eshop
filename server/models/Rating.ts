import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Product } from './Product';
import { User } from './User';

@Table
export class Rating extends Model {
	@Column({ type: DataType.ENUM('1', '2', '3', '4', '5'), allowNull: false })
	value!: number;

	@ForeignKey(() => User)
	userId!: number;

	@ForeignKey(() => Product)
	productId!: number;
}
