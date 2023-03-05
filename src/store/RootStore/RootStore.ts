import RepositoriesStore from "@store/RepositoriesStore";
import RepositoryStore from "@store/RepositoryStore";

class RootStore {
  readonly queryRepositories = new RepositoriesStore();
  readonly queryRepository = new RepositoryStore();
}
export default RootStore;
