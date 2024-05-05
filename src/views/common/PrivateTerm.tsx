import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ReactNode } from 'react';

type PrivateTermProps = {
  children?: ReactNode;
};
const PrivateTerm = ({ children }: PrivateTermProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-sb22">그루어리 서비스 약관</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="max-h-[60vh] border border-gray-100 rounded-xl p-6 max-w-[540px] overflow-scroll">
          제1조 목적 본 이용약관은 “사이트명”(이하 사이트)의 서비스의 이용조건과 운영에
          관한 제반 사항 규정 을 목적으로 합니다. 제2조 용어의 정의 본 약관에서 사용되는
          주요한 용어의 정의는 다음과 같습니다. 1 회원 : 사이트의 약관에 동의하고
          개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고
          사이트를 이용하는 이용자를 말합니다. 1 회원 : 사이트의 약관에 동의하고
          개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고
          사이트를 이용하는 이용자를 말합니다. 1 회원 : 사이트의 약관에 동의하고
          개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고
          사이트를 이용하는 이용자를 말합니다. 1 회원 : 사이트의 약관에 동의하고
          개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고
          사이트를 이용하는 이용자를 말합니다. 제1조 목적 본 이용약관은 “사이트명”(이하
          사이트)의 서비스의 이용조건과 운영에 관한 제반 사항 규정 을 목적으로 합니다.
          제2조 용어의 정의 본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다. 1
          회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서,
          사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다. 1 회원 :
          사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의
          이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다. 1 회원 : 사이트의
          약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을
          체결하고 사이트를 이용하는 이용자를 말합니다. 1 회원 : 사이트의 약관에 동의하고
          개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고
          사이트를 이용하는 이용자를 말합니다.제1조 목적 본 이용약관은 “사이트명”(이하
          사이트)의 서비스의 이용조건과 운영에 관한 제반 사항 규정 을 목적으로 합니다.
          제2조 용어의 정의 본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다. 1
          회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서,
          사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다. 1 회원 :
          사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의
          이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다. 1 회원 : 사이트의
          약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을
          체결하고 사이트를 이용하는 이용자를 말합니다. 1 회원 : 사이트의 약관에 동의하고
          개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고
          사이트를 이용하는 이용자를 말합니다.
        </div>
        <AlertDialogFooter>
          <AlertDialogAction asChild className="h-10">
            <Button>
              <Check className="mr-1" width={20} height={20} />
              확인했습니다
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PrivateTerm;
