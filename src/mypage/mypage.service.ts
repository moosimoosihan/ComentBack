// services/mypage.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class MypageService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async updateUser(userId: string, about: string): Promise<User> {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            user.about = about;
            await user.save();

            return user;
        } catch (error) {
            throw new Error('Failed to update user: ' + error.message);
        }
    }

    async getUpdatedUser(userId: string, about: string): Promise<User[]> {
        try {
            // about 필드에 따라 검색하여 사용자 목록을 반환합니다.
            const users = await this.userModel.find({ _id: userId, about });
            return users;
        } catch (error) {
            throw new Error('Failed to get updated user: ' + error.message);
        }
    }

    async updateNickname(userId: string, nickname: string): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, { nickname }, { new: true });
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
      }
}