# Generated by Django 3.1.2 on 2020-10-22 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movietime', '0003_auto_20201023_0015'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='managerstatus',
        ),
        migrations.AddField(
            model_name='user',
            name='manager',
            field=models.BooleanField(default=False, verbose_name='Manager Status'),
        ),
        migrations.AlterField(
            model_name='user',
            name='phonenumber',
            field=models.CharField(max_length=20, verbose_name='Phone Number'),
        ),
    ]
