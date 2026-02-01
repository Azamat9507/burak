import MemberModel from "../schema/Member.model";
import { Member, MemberInput, LoginInput } from "../libs/types/member";
import Errors, { HttpCode, Message} from "../libs/types/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from 'bcrypt';

class MemberService {
    private readonly memberModel;

    constructor(){
        this.memberModel = MemberModel;
    }

/** SPA */
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
  //review qilamiz:async login metodi ichida LoginInput tipidagi input ni qabul qiladi va 
  // Member tipidagi natijani qaytaradi Promise<Member> ni qaytaradi va bu metod asinxron ishlaydi va natija kelishini kutadi
  // TODO: consider member status later
  const member = await this.memberModel
    .findOne(
      { memberNick: input.memberNick }, // Filter dan foydalanib, memberNick ga mos keladigan hujjatni qidiradi
      { memberNick: 1, memberPassword: 1 } // Projection - Faqat memberNick va memberPassword maydonlarini qaytaradi
    )
    .exec();

  if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

  const isMatch = await bcrypt.compare(
    input.memberPassword, // foydalanuvchi kiritgan parol 
    member.memberPassword // bazadagi xeshlangan parol
  );
  if (!isMatch) {
    throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
  }

  return await this.memberModel.findById(member._id).lean().exec(); // member ni to'liq ma'lumotlarini qaytaradi va 
  // lean() metodi natijani oddiy JavaScript obyekti sifatida qaytaradi | 
  // findeById orqali member ni topadi va exec() metodi bilan so'rovni bajaradi
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
}

export default MemberService;
