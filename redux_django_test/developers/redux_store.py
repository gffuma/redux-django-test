# --- External Lib --- #
class Store:
    def __init__(self, state):
        self.state = state

    # TODO: Very basic implentation: deep merge, path update...
    def set_state(self, state):
        new_state = self.state.copy()
        new_state.update(state)
        self.state = new_state

    def get_state(self):
        return self.state.copy()

def create_store(state = {}):
    return Store(state)
# --- External Lib --- #

# global app store
store = create_store()
