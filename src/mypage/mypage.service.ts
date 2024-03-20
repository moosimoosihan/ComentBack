// posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/Dto/updateUser.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class MypageService {
    constructor(@InjectModel(User.name) private postModel: Model<UserDocument>) { }

    async addUserNewData(id: string, newData: UpdateUserDto): Promise<User> {
        try {
            // 기존 문서를 ID를 사용하여 찾습니다.
            let existingPost = await this.postModel.findById(id);

            // 만약 문서를 찾았다면 새로운 데이터를 추가하여 업데이트합니다.
            if (existingPost) {
                existingPost.about = newData.about; // about 필드 추가
                existingPost = await existingPost.save(); // 업데이트된 문서를 저장하고 반환합니다.
                return existingPost;
            } else if (existingPost === null) {
                console.log('문서를 찾지 못했습니다.');
            } else {
                throw new Error('Post not found');
            }
        } catch (error) {
            // 오류가 발생한 경우 예외를 던집니다.
            throw new Error('Failed to add new data: ' + error.message);
        }
    }
}