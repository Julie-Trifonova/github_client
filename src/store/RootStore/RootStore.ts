import RepositoriesStore from "store/RepositoriesStore";
import RepositoryStore from "store/RepositoryStore";

class RootStore {
  readonly queryRepository = new RepositoryStore();
  readonly queryRepositories = new RepositoriesStore();
}
export { RootStore };
