# Generated by Django 4.1.7 on 2023-03-18 11:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_category_repeat_status_task_step'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='is_imported',
            new_name='is_important',
        ),
    ]