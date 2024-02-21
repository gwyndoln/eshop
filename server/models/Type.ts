import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { Product } from './Product';

const cyrillicToTranslit = new (CyrillicToTranslit as any)();


@Table
export class Type extends Model {
	@Column({defaultValue: DataType.UUIDV4, type: DataType.UUID})
	uuid!: string;

	@Column({ type: DataType.STRING(50), allowNull: false })
	title!: string;

	@Column({
		type: DataType.STRING(300),
		allowNull: false,
		set(value: string[]) {
			this.setDataValue('image', value);
		},
		get() {
			return this.getDataValue('image');
		},
	})
	image!: string;

	@Column({
		type: DataType.VIRTUAL,
		set() {
			throw new Error('Нельзя задать `url` значение')
		},
		get() {
			return cyrillicToTranslit.transform((this as Type).title, '-').toLowerCase()
		}
	})
	url!: string;

	@ForeignKey(() => Type)
	@Column
	subTypeId?: number;

	@BelongsTo(() => Type)
	mainType?: Type;

	@HasMany(() => Type)
	subTypes?: Type | Type[];

	@HasMany(() => Product)
	products!: Product | Product[];
}
