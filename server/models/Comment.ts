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
	@Column({ type: DataType.TEXT, allowNull: false })
	text!: string;

	@Column
	image?: string;

	@Column
	video?: string;

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
	userId?: number;

	@BelongsTo(() => User, {
		foreignKey: { name: 'userId', allowNull: false },
	})
	user!: User;
}
