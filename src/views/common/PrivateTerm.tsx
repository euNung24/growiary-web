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
          <AlertDialogTitle className="font-sb22 pt-4 pb-2">
            개인정보 처리방침
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="max-h-[60vh] font-r14 border border-gray-100 rounded-xl p-6 max-w-[540px] overflow-scroll [&>h1]:font-bolder [&>h2]:font-bold [&>h2]:mt-4 [&>ul]:indent-2">
          {/*<h1>그루어리 개인정보처리 방침</h1>*/}

          <h2 className="!mt-0">1. 수집하는 개인정보 항목 및 수집목적</h2>
          <p>1.1. 회사는 다음과 같은 목적으로 개인정보를 수집하고 있습니다.</p>
          <ul>
            <li>
              (1) 서비스 이용을 위한 회원가입: 이용자 식별, 서비스 제공을 위한 회원관리
            </li>
            <li>(2) 결제 정보 수집: 유료 서비스 이용 시 결제 처리</li>
            <li>
              (3) 이벤트 및 마케팅 활동: 이벤트 참여, 광고 및 마케팅 활동에 대한 응모 및
              안내
            </li>
          </ul>
          <p>
            <i>(동의시)</i>
          </p>

          <p>1.2. 수집하는 개인정보 항목은 다음과 같습니다.</p>
          <ul>
            <li>
              (1) 필수 정보: 이용자의 닉네임, 아이디, 비밀번호, 이메일 주소, 결제 정보
            </li>
            <li>(2) 선택 정보: 프로필 사진, 연령, 성별, 주소 등</li>
          </ul>

          <h2>2. 개인정보의 이용 목적</h2>
          <p>2.1. 회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.</p>
          <ul>
            <li>(1) 서비스 제공 및 관리</li>
            <li>(2) 이용자 식별 및 본인확인</li>
            <li>(3) 서비스 이용에 따른 요금 결제 및 결제 확인</li>
            <li>(4) 고객 서비스 제공 및 문의 응대</li>
            <li>(5) 이벤트 및 마케팅 활동에 따른 정보 제공 및 참여 기회 제공</li>
          </ul>

          <h2>3. 개인정보의 보유 및 이용 기간</h2>
          <p>
            3.1. 회사는 개인정보를 수집한 목적이 달성되면 지체 없이 파기하며, 서비스 이용
            계약이 종료된 경우에도 해당 정보를 즉시 파기합니다. 단, 관련 법령에 따라 일정
            기간 동안은 보존할 수 있습니다.
          </p>

          <h2>4. 개인정보의 제3자 제공</h2>
          <p>
            4.1. 회사는 이용자의 개인정보를 본 방침에서 고지한 범위 내에서 제3자에게
            제공할 수 있습니다. 단, 이용자의 동의를 받은 경우 또는 법령에 의한 경우를
            제외하고는 제3자에게 제공하지 않습니다.
          </p>

          <h2>5. 개인정보의 안전성 확보 조치</h2>
          <p>
            5.1. 회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
          </p>
          <ul>
            <li>
              (1) 개인정보 암호화: 이용자의 개인정보는 암호화되어 저장되며, 비인가자의
              접근을 방지합니다.
            </li>
            <li>
              (2) 접근 제한: 개인정보에 대한 접근 권한을 최소한으로 제한하고, 관리자를
              통한 감독을 강화합니다.
            </li>
            <li>
              (3) 보안 프로그램 사용: 최신 보안 프로그램을 이용하여 개인정보의 누출, 변조,
              훼손을 방지합니다.
            </li>
          </ul>

          <h2>6. 이용자의 권리와 의무</h2>
          <p>
            6.1. 이용자는 언제든지 자신의 개인정보에 대한 접근, 정정, 삭제, 처리정지 등을
            요청할 수 있습니다.
          </p>
          <p>
            6.2. 이용자는 개인정보를 입력하는 과정에서 정확한 정보를 제공하여야 하며,
            자신의 개인정보에 대한 관리 및 보호 책임을 져야 합니다.
          </p>

          <h2>7. 개인정보 보호 책임자</h2>
          <p>
            7.1. 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지는 개인정보 보호
            책임자를 지정하여 운영하고 있습니다.
          </p>

          <h2>8. 개인정보 처리방침의 변경</h2>
          <p>
            8.1. 개인정보 처리방침은 정부의 법령 및 지침의 변경이나 회사의 내부 정책
            변경에 따라 변경될 수 있습니다. 변경 사항은 서비스 내 공지사항을 통해 사전에
            공지하며, 변경된 개인정보 처리방침은 공지된 날로부터 시행됩니다.
          </p>

          <p className="mt-4">본 약관은 2024.05.08부터 적용됩니다.</p>
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
