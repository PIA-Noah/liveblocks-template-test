from rest_framework import routers

from data.views import UserViewSet,OrgViewSet,ConViewSet,ExerViewSet,FileViewSet,CommentViewSet,ShareViewSet
from data.views import FileAccessViewSet,MailBellViewSet
from data.views import OrgConRightViewSet,UserConRightViewSet,OrgExerRightViewSet,UserExerRightViewSet

router = routers.SimpleRouter()

router.register('user', UserViewSet, basename="CustomUser")
router.register('organization', OrgViewSet, basename="Organization")
router.register('contract', ConViewSet, basename="Contract")
router.register('exercise', ExerViewSet, basename="Exercise")
router.register('file', FileViewSet, basename="File")
router.register('comment', CommentViewSet, basename="Comment")
router.register('share', ShareViewSet, basename="Share")

router.register('mailbell', MailBellViewSet, basename="Mail Bell")
router.register('access', FileAccessViewSet, basename="File Access")
router.register('orgconrights', OrgConRightViewSet, basename="Organization Contract rights")
router.register('userconrights', UserConRightViewSet, basename="User Contract rights")
router.register('orgexerrights', OrgExerRightViewSet, basename="Organization Exercise rights")
router.register('userexerrights', UserExerRightViewSet, basename="User Exercise rights")

urlpatterns = router.urls