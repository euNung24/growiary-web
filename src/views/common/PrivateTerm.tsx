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
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-sb22">개인정보 처리방침</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="max-h-[60vh] border border-gray-100 rounded-xl p-6 max-w-[540px] overflow-scroll">
          그루어리 개인정보처리 방침 1. 수집하는 개인정보 항목 및 수집목적 1.1. 회사는
          다음과 같은 목적으로 개인정보를 수집하고 있습니다. - (1) 서비스 이용을 위한
          회원가입: 이용자 식별, 서비스 제공을 위한 회원관리 - (2) 결제 정보 수집: 유료
          서비스 이용 시 결제 처리 (동의시) - (3) 이벤트 및 마케팅 활동: 이벤트 참여, 광고
          및 마케팅 활동에 대한 응모 및 안내 1.2. 수집하는 개인정보 항목은 다음과
          같습니다. - (1) 필수 정보: 이용자의 닉네임, 아이디, 비밀번호, 이메일 주소, 결제
          정보 - (2) 선택 정보: 프로필 사진, 연령, 성별, 주소 등 2. 개인정보의 이용 목적
          2.1. 회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다. - (1) 서비스 제공
          및 관리 - (2) 이용자 식별 및 본인확인 - (3) 서비스 이용에 따른 요금 결제 및 결제
          확인 - (4) 고객 서비스 제공 및 문의 응대 - (5) 이벤트 및 마케팅 활동에 따른 정보
          제공 및 참여 기회 제공 3. 개인정보의 보유 및 이용 기간 3.1. 회사는 개인정보를
          수집한 목적이 달성되면 지체 없이 파기하며, 서비스 이용 계약이 종료된 경우에도
          해당 정보를 즉시 파기합니다. 단, 관련 법령에 따라 일정 기간 동안은 보존할 수
          있습니다. 4. 개인정보의 제3자 제공 4.1. 회사는 이용자의 개인정보를 본 방침에서
          고지한 범위 내에서 제3자에게 제공할 수 있습니다. 단, 이용자의 동의를 받은 경우
          또는 법령에 의한 경우를 제외하고는 제3자에게 제공하지 않습니다. 5. 개인정보의
          안전성 확보 조치 5.1. 회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를
          취하고 있습니다. - (1) 개인정보 암호화: 이용자의 개인정보는 암호화되어 저장되며,
          비인가자의 접근을 방지합니다. - (2) 접근 제한: 개인정보에 대한 접근 권한을
          최소한으로 제한하고, 관리자를 통한 감독을 강화합니다. - (3) 보안 프로그램 사용:
          최신 보안 프로그램을 이용하여 개인정보의 누출, 변조, 훼손을 방지합니다. 6.
          이용자의 권리와 의무 6.1. 이용자는 언제든지 자신의 개인정보에 대한 접근, 정정,
          삭제, 처리정지 등을 요청할 수 있습니다. 6.2. 이용자는 개인정보를 입력하는
          과정에서 정확한 정보를 제공하여야 하며, 자신의 개인정보에 대한 관리 및 보호
          책임을 져야 합니다. 7. 개인정보 보호 책임자 7.1. 회사는 개인정보 처리에 관한
          업무를 총괄해서 책임지는 개인정보 보호 책임자를 지정하여 운영하고 있습니다. 8.
          개인정보 처리방침의 변경 8.1. 개인정보 처리방침은 정부의 법령 및 지침의 변경이나
          회사의 내부 정책 변경에 따라 변경될 수 있습니다. 변경 사항은 서비스 내
          공지사항을 통해 사전에 공지하며, 변경된 개인정보 처리방침은 공지된 날로부터
          시행됩니다. 본 약관은 2024.05.08부터 적용됩니다.
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
