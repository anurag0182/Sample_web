from django.db import models

class Blogging(models.Model):
    title= models.CharField(max_length=200)
    slug= models.SlugField(unique=True)
    text= models.TextField()
    image= models.ImageField(upload_to="blogging/")
    created_at= models.DateTimeField(auto_now_add=True)
    views= models.IntegerField(default=0)
    category = models.CharField(max_length=100)
    is_published = models.BooleanField(default=True)


    def __str__(self):
        return self.title