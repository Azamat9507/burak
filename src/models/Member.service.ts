import MemberModel from "../schema/Member.model";
import { Member, MemberInput, LoginInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message} from "../libs/types/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import * as bcrypt from 'bcrypt';
import { shapeIntoMongooseObjectId } from "../libs/types/config";

class MemberService {
    private readonly memberModel;

    constructor(){
        this.memberModel = MemberModel;
    }

/** SPA */

public async getRestaurant(): Promise<Member> {
  const result = await this.memberModel
    .findOne({ memberType: MemberType.RESTAURANT })
    .lean()
    .exec();
  if (!result)
    throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  return result;
}

  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("Error, model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> { 
    //async login metodi ichida LoginInput tipidagi input ni qabul qiladi va 
    // Member tipidagi natijani qaytaradi Promise<Member> ni qaytaradi va bu metod asinxron ishlaydi va natija kelishini kutadi
    const member = await this.memberModel
      .findOne(
        {
          memberNick: input.memberNick,
          memberStatus: { $ne: MemberStatus.DELETE },
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 }
      )
      .exec();

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }

    console.log("member:", member);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.memberModel.findById(member._id).lean().exec();
  }

  public async getMemberDetail(member: Member): Promise<Member> {
  const memberId = shapeIntoMongooseObjectId(member._id);
  const result = await this.memberModel
    .findOne({ _id: memberId, memberStatus: MemberStatus.ACTIVE })
    .exec();

  if (!result)
    throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  return result;
}

public async updateMember(
  member: Member,
  input: MemberUpdateInput
): Promise<Member> {
  const memberId = shapeIntoMongooseObjectId(member._id);
  const result = await this.memberModel
    .findOneAndUpdate({ _id: memberId }, input, { new: true })
    .exec();

  if (!result)
    throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

  return result;
}

public async getTopUsers(): Promise<Member[]> {
  const result = await this.memberModel
    .find({
      memberStatus: MemberStatus.ACTIVE,
      memberPoints: { $gte: 1 },
    })
    .sort({ memberPoints: -1 })
    .limit(4)
    .exec();

  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  return result;
}


  /** BSSR */
  public async processSignup(input: MemberInput): Promise<Member> {
      const exist = await this.memberModel
      .findOne({ memberType : MemberType.RESTAURANT})
      .exec();
      console.log("exist:", exist);
      if (exist)  throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);

      const salt = await  bcrypt.genSalt();
      input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

      try{
        const result = await this.memberModel.create(input);
        result.memberPassword = "";
        return result;
      } catch (err){
          throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
      }
  }

  public async processLogin(input: LoginInput): Promise<Member> { //review qilamiz:async processLogin metodi ichida LoginInput tipidagi input ni qabul qiladi va Member tipidagi natijani qaytaradi
      const member = await this.memberModel
          .findOne( 
              { memberNick: input.memberNick, memberType: MemberType.RESTAURANT }, // Filter dan foydalanib, memberNick va memberType ga mos keladigan hujjatni qidiradi
              { memberNick: 1, memberPassword: 1 }
          )
          .exec();
      
      if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
          const isMatch = await bcrypt.compare(
              input.memberPassword, // foydalanuvchi kiritgan parol
              member.memberPassword // bazadagi xeshlangan parol
          );

      console.log("isMatch:", isMatch);
      if(!isMatch) {
          throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);        
      } 

      return await this.memberModel.findById(member._id).exec();
    
  }

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
    .find({ memberType: MemberType.USER })
    .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
    .findByIdAndUpdate(
      { _id: input._id }, // Filter qilish
      input, // Update
      { new: true, runValidators: true }, // OPTION
    )
    .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    
    return result;
  }

}

export default MemberService;
