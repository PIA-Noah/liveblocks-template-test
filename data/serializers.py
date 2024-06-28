from rest_framework import serializers

from .models import CustomUser,Organization,Contract,Exercise,File,Comment,Share
from .models import FileAccess,MailBell
from .models import OrgConRight,OrgExerRight,UserConRight,UserExerRight

class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = '__all__'
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['from_user','to_user','date','file'].read_only =True
class MailBellSerializer(serializers.ModelSerializer):
    class Meta:
        model = MailBell
        fields = '__all__'
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['user'].read_only =True
class FileAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileAccess
        fields = '__all__'
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['file'].read_only =True

class OrgConRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgConRight
        fields = '__all__'
        read_only_fields = ['org','con','nb_acct']
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['org','con'].read_only =True
class UserConRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConRight
        fields = '__all__'
        read_only_fields = ['user','con']
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['user','con'].read_only =True
class OrgExerRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgExerRight
        fields = '__all__'
        read_only_fields = ['org','exer']
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['org','exer'].read_only =True
class UserExerRightSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExerRight
        fields = '__all__'
        read_only_fields = ['user','exer']
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['user','exer'].read_only =True


class UserSerializer(serializers.ModelSerializer):
    mailbell = MailBellSerializer
    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ['id']
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['org'].read_only =True
class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'
        read_only_fields = ['id']
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
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['con','org',].read_only =True
class FileSerializer(serializers.ModelSerializer):
    access = FileAccessSerializer(read_only=True)
    class Meta:
        model = File
        fields = '__all__'
        read_only_fields = ['id']
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['uploader','con','exer'].read_only =True
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['id']
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        if self.instance is not None:
            self.fields['commenter','parent','file'].read_only =True

# Spaces
class MySpaceShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ['file']

class MySpaceAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileAccess
        fields = ['file']

class OrgSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileAccess
        fields = ['file']

class PublicSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileAccess
        fields = ['file']
# class TestSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Organization
#         fields = ['id']
