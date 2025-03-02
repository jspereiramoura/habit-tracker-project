import Button from "../_components/button";
import ActivityTrackerIllustration from "../_components/icons/ActivityTracker";

export default function Home() {
  return (
    <section
      aria-label="Sessão de boas-vindas"
      className="flex px-5 flex-col text-center items-center justify-center 
    h-[calc(100dvh-141px)] md:h-[calc(100dvh-81px)]"
    >
      <ActivityTrackerIllustration className="w-90 mb-4" />
      <h1 className="text-lg md:text-4xl font-bold font-montserrat">
        Organize seus hábitos com facilidade!
      </h1>
      <p className="text-sm text-justify mt-2 mb-4 max-w-[360] md:max-w-[715] md:text-lg md:text-center">
        Cansado de esquecer de suas tarefas diárias? Experimente o{" "}
        <strong className="text-primary whitespace-nowrap">
          Owl Habit Tracker
        </strong>
        , o aplicativo que vai te ajudar a manter o foco e a disciplina!
      </p>
      <Button
        as="a"
        href="/entrar"
        className="w-full text-sm max-w-[360] md:w-auto"
      >
        Faça seu cadastro
      </Button>
    </section>
  );
}
