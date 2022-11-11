import { User } from './User';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';

@Table
export class Comment extends Model {
	@Column({ type: DataType.STRING(1000), allowNull: false })
	text!: string;

	@Column({
		type: DataType.STRING(400),
		set(value: string[]) {
			this.setDataValue('images', value.join(';'));
		},
		get() {
			return this.getDataValue('images').split(';');
		},
	})
	images?: string;

	@Column({
		type: DataType.STRING(400),
		set(value: string[]) {
			this.setDataValue('videos', value.join(';'));
		},
		get() {
			return this.getDataValue('videos').split(';');
		},
	})
	videos?: string;

	@Column({ defaultValue: 0 })
	likes!: number;

	@ForeignKey(() => Comment)
	@Column
	subCommentId?: number;

	@BelongsTo(() => Comment, { foreignKey: 'subCommentId' })
	mainComment?: Comment;

	@HasMany(() => Comment, { foreignKey: 'subCommentId' })
	subComments?: Comment[];

	@ForeignKey(() => User)
	@Column
	userId!: number;

	@BelongsTo(() => User, {
		foreignKey: { name: 'userId', allowNull: false },
	})
	user!: User;
}
