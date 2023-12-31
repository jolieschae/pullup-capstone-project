"""empty message

Revision ID: 24c22608fecd
Revises: 
Create Date: 2023-07-07 09:29:07.981317

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '24c22608fecd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('birthday', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('avatar', sa.String(), nullable=True),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('gender', sa.String(), nullable=False),
    sa.Column('art_form', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('host_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('thumbnail', sa.String(), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.Column('subcategory', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('venue', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('state', sa.String(), nullable=False),
    sa.Column('zip', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('start_time', sa.DateTime(), nullable=False),
    sa.Column('end_time', sa.DateTime(), nullable=False),
    sa.Column('age_restrictions', sa.String(), nullable=True),
    sa.Column('tickets', sa.String(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['host_id'], ['users.id'], name=op.f('fk_events_host_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rsvps',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('attended', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name=op.f('fk_rsvps_event_id_events')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_rsvps_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('collaborator_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['collaborator_id'], ['users.id'], name=op.f('fk_user_events_collaborator_id_users')),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name=op.f('fk_user_events_event_id_events')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_events')
    op.drop_table('rsvps')
    op.drop_table('events')
    op.drop_table('users')
    # ### end Alembic commands ###
