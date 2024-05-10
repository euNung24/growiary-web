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

type ServiceTermProps = {
  children?: ReactNode;
};
const ServiceTerm = ({ children }: ServiceTermProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-sb22">서비스 이용약관</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="max-h-[60vh] border font-r14 border-gray-100 rounded-xl p-6 max-w-[540px] overflow-scroll">
          그루어리서비스 이용약관 **제1조 목적** 이 약관은 그루어리 서비스(이하
          &quot;서비스&quot;)를 제공하는 회사와 이 서비스를 이용하는 이용자 간의 권리,
          의무 및 책임사항을 정함을 목적으로 합니다. **제2조 약관의 효력과 변경** 1. 본
          약관은 서비스를 이용하고자 하는 모든 이용자에게 공지함으로써 효력을 발생합니다.
          2. 회사는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내에
          공지함으로써 효력을 발생합니다. **제3조 서비스 이용 신청 및 계약의 성립** 1.
          이용자는 서비스 신청 시 회사에서 제공하는 양식에 따라 정보를 기입하여 이용
          신청을 합니다. 2. 회사는 이용자의 서비스 이용 신청에 대한 승낙 여부를 확인 후
          서비스 이용 계약을 체결합니다. **제4조 서비스 이용료와 결제 방법** 1. 서비스
          이용은 유료로 제공될 수 있으며, 이용자는 서비스 이용에 대한 요금을 회사에서 정한
          방법으로 납부합니다. 2. 결제 시 사용 가능한 결제 수단은 회사에서 정하는 바에
          따릅니다. **제5조 개인정보 보호** 1. 회사는 이용자의 개인정보를 서비스 제공
          목적으로만 사용하며, 이용자의 동의 없이 제3자에게 제공하지 않습니다. 2. 개인정보
          보호에 대한 자세한 사항은 개인정보 처리방침을 참조하시기 바랍니다. **제6조
          서비스의 제공 및 변경** 1. 회사는 이용자에게 안정적인 서비스를 제공하기 위해
          최선을 다하며, 필요한 경우 사전 고지 후 서비스 내용을 변경할 수 있습니다. 2.
          서비스 중단의 경우 회사는 이를 사전에 고지하고, 만약 이용자에게 불리한 변경이
          있는 경우에는 해당 이용자에게 별도의 통지를 합니다. **제7조 서비스 이용의 제한
          및 중단** 1. 이용자는 서비스 이용 시 다음 각 호에 해당하는 행위를 하여서는 안
          됩니다. - (1) 타인의 정보 도용 - (2) 불법적인 목적으로 서비스 이용 - (3) 서비스
          운영에 지장을 주는 행위 2. 회사는 이용자가 본 조를 위반한 경우, 서비스 이용을
          제한하거나 중단할 수 있습니다. **제8조 책임의 한계** 1. 회사는 천재지변, 전쟁,
          기간통신사업자의 서비스 중단 등 불가항력적인 사유로 인해 서비스 제공이 불가능한
          경우 책임이 면제됩니다. 2. 이용자의 귀책사유로 인한 서비스 이용 장애에 대해서는
          회사는 책임을 지지 않습니다. **제9조 분쟁의 해결** 1. 서비스 이용으로 발생한
          분쟁에 대해서는 회사와 이용자 간의 협의를 통해 원만히 해결합니다. 2. 협의가
          어려운 경우, 관련 법령에 따른 소송을 제기할 수 있습니다. **제10조 기타** 1. 본
          약관에 명시되지 않은 사항에 대해서는 관련 법령 및 회사의 정책에 따릅니다. 2. 본
          약관의 내용 중 일부가 무효로 판결되더라도 나머지 부분은 유효하게 남습니다. 본
          약관은 2024.05.08부터 적용됩니다.
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

export default ServiceTerm;
