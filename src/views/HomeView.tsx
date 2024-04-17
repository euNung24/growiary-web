import { Button, ButtonIcon } from '@/components/ui/button';

const Home = () => {
  return (
    <>
      <Button size="xl">그루어리</Button>
      <br />
      <Button size="sm">그루어리</Button>
      <br />
      <Button size="xl" variant="secondary">
        그루어리
      </Button>
      <br />
      <Button size="sm" variant="secondary">
        그루어리
      </Button>
      <br />
      <Button size="sm" variant="outline">
        그루어리
      </Button>
      <br />
      <Button size="sm" variant="ghost">
        그루어리
      </Button>
      <br />
      <Button size="sm" variant="outlineGray">
        그루어리
      </Button>
      <br />
      <Button size="sm" variant="ghostGray">
        그루어리
      </Button>
      <main>main</main>
      <Button size="sm" variant="secondary" disabled>
        그루어리
      </Button>
      <Button size="sm" variant="outline" disabled>
        그루어리
      </Button>
      <Button size="sm" variant="ghost" disabled>
        그루어리
      </Button>
      <Button disabled>그루어리</Button>
      <Button>
        <ButtonIcon src="/next.svg" alt="default" />
        그루어리
      </Button>
    </>
  );
};

export default Home;
