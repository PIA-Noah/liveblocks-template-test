from rest_framework import serializers

from .models import CustomUser,Organization,Contract,Exercise,File,Comment,Share
from .models import FileAccess,MailBell
from .models import OrgConRight,OrgExerRight,UserConRight,UserExerRight

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ['name', 'id']
class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'
        read_only_fields = ['name', 'id']
class ConSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'
        read_only_fields = ['id',]
class ExerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'
        read_only_fields = ['id',]
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'
        read_only_fields = ['id','uploader']
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['id','line','colone','commenter','parent','file']
class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = '__all__'
        read_only_fields = '__all__'

class MailBellSerializer(serializers.ModelSerializer):
    class Meta:
        model = MailBell
        fields = '__all__'
        read_only_fields = ['user',]
class FileAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileAccess
        fields = '__all__'
        read_only_fields = ['file',]

class OrgConRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgConRight
        fields = '__all__'
        read_only_fields = ['org','con','nb_acct']
class UserConRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConRight
        fields = '__all__'
        read_only_fields = ['user','con']
class OrgExerRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgExerRight
        fields = '__all__'
        read_only_fields = ['org','exer']
class UserExerRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExerRight
        fields = '__all__'
        read_only_fields = ['user','exer']
